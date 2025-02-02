export default function Auth() {
  return (
    <div className="flex justify-center mx-auto w-1/2">
      <div className="card card-dash bg-base-100 w-96">
        <div className="card-body">
          <div role="tablist" className="tabs tabs-border">
            <input
              type="radio"
              name="auth"
              role="tab"
              className="tab"
              aria-label="Login"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 p-10">
              Tab content 1
            </div>

            <input
              type="radio"
              name="auth"
              role="tab"
              className="tab"
              aria-label="Register"
            />
            <div className="tab-content border-base-300 bg-base-100 p-10">
              Tab content 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
