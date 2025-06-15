export default function PostsTable({posts}: {
  posts: {
    id: number,
    content: string,
    author: { email: string },
    highlighted: boolean,
    canEditPost: boolean,
    createdAt: Date
  }[]
}) {
  return <table className="w-full mt-12">
    <thead>
    <tr className="border-b-2 border-gray-400">
      <th className="p-1 border-gray-400">created</th>
      <th>Title</th>
      <th>Author</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {posts.map((post) => (
      <tr key={post.id} className={`border-b border-gray-400 ${post.highlighted ? "font-bold" : ""}`}>
        <td className="p-1 text-left border-gray-400 py-2">{post.createdAt.toLocaleString("ja-JP", {
          dateStyle: "short",
          timeStyle: "short"
        })}</td>
        <td className="p-1 text-left py-2">{post.content}</td>
        <td className="p-1 text-right py-2">{post.author.email}</td>
        <td>{post.canEditPost && "[edit]"}</td>
      </tr>
    ))}
    </tbody>
  </table>
}
