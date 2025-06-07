import LinkPrimary from "~/components/LinkPrimary";

export function NewPostButton({canCreatePost}: { canCreatePost: boolean; }) {
  return (
    <>
      {canCreatePost ? (
        <LinkPrimary to={`/posts/new`}>New Post</LinkPrimary>
      ) : (
        <LinkPrimary to={`/sessions/new`}>Login to create New Post</LinkPrimary>
      )}
    </>
  );
}
