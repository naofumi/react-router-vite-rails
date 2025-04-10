import type { useAuth } from "~/components/AuthProvider";
import LinkPrimary from "~/components/LinkPrimary";

export function NewPostButton({
  currentUser,
}: {
  currentUser: ReturnType<typeof useAuth>["currentUser"];
}) {
  return (
    <>
      {currentUser ? (
        <LinkPrimary to={`/posts/new`}>New Post</LinkPrimary>
      ) : (
        <LinkPrimary to={`/sessions/new`}>Login to create New Post</LinkPrimary>
      )}
    </>
  );
}
