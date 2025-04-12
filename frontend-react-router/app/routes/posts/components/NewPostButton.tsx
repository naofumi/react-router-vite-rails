import type { useAuth } from "~/components/AuthProvider";
import LinkPrimary from "~/components/LinkPrimary";

export function NewPostButton({
  me,
}: {
  me: ReturnType<typeof useAuth>["me"];
}) {
  return (
    <>
      {me ? (
        <LinkPrimary to={`/posts/new`}>New Post</LinkPrimary>
      ) : (
        <LinkPrimary to={`/sessions/new`}>Login to create New Post</LinkPrimary>
      )}
    </>
  );
}
