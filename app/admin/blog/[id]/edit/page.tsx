import AdminTopbar from "@/components/admin/AdminTopbar";
import EditBlogClient from "@/components/blog/EditBlogClient";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <AdminTopbar title="Edit Blog" subtitle="Update blog post" />
      <EditBlogClient id={id} />
    </div>
  );
}
