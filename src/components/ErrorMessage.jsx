import {memo} from "react";

export default memo(function ErrorMessage({error}) {
  if (!error) return null;
  return (
    <section className="error-message error">
      <div className="er-main">
        <p>{error}</p>
      </div>
    </section>
  );
});
