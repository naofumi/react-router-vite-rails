import LinkPrimary from "~/components/LinkPrimary";
import type {Me} from "~/models/me"

export function NewPostButton({
  me,
}: {
  me: Me | null;
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
