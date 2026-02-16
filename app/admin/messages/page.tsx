"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Message = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: { seconds: number } | null;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "contactMessages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Message[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Message, "id">),
      }));
      setMessages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function toggleRead(msg: Message) {
    await updateDoc(doc(db, "contactMessages", msg.id), {
      read: !msg.read,
    });
  }

  async function handleDelete(id: string) {
    const ok = confirm("Delete this message permanently?");
    if (!ok) return;
    await deleteDoc(doc(db, "contactMessages", id));
  }

  function formatDate(ts: { seconds: number } | null) {
    if (!ts) return "—";
    return new Date(ts.seconds * 1000).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Messages
            </h1>
            <p className="mt-2 text-zinc-600">
              Contact form submissions
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
          {/* Table Header */}
          <div className="hidden gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-medium text-zinc-600 md:grid md:grid-cols-12">
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="p-6 text-zinc-600">Loading…</div>
          ) : messages.length === 0 ? (
            <div className="p-6 text-zinc-600">No messages yet.</div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="border-b border-zinc-100">
                {/* Row */}
                <div
                  className="grid cursor-pointer grid-cols-1 gap-2 px-4 py-3 text-sm transition-colors hover:bg-zinc-50 md:grid-cols-12 md:items-center"
                  onClick={() =>
                    setExpandedId(expandedId === m.id ? null : m.id)
                  }
                >
                  {/* Status dot */}
                  <div className="col-span-1 flex items-center gap-2 md:gap-0">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        m.read ? "bg-zinc-300" : "bg-purple-500"
                      }`}
                    />
                    <span className="text-xs text-zinc-500 md:hidden">
                      {m.read ? "Read" : "Unread"}
                    </span>
                  </div>

                  {/* Name */}
                  <div
                    className={`col-span-2 truncate ${
                      m.read ? "text-zinc-600" : "font-semibold text-zinc-900"
                    }`}
                  >
                    {m.name}
                  </div>

                  {/* Email */}
                  <div className="col-span-3 truncate text-zinc-600">
                    {m.email || "—"}
                  </div>

                  {/* Phone */}
                  <div className="col-span-2 truncate text-zinc-600">
                    {m.phone || "—"}
                  </div>

                  {/* Date */}
                  <div className="col-span-2 text-xs text-zinc-500">
                    {formatDate(m.createdAt)}
                  </div>

                  {/* Actions */}
                  <div
                    className="col-span-2 flex justify-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => toggleRead(m)}
                      className="rounded-xl border border-zinc-200 px-3 py-1 text-xs hover:bg-zinc-50"
                    >
                      {m.read ? "Mark unread" : "Mark read"}
                    </button>

                    <button
                      onClick={() => handleDelete(m.id)}
                      className="rounded-xl border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Expanded message */}
                {expandedId === m.id && (
                  <div className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Message
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
                      {m.message || "No message provided."}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
