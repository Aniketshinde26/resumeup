import { useRegister } from "../hooks/useRegister";
import { ErrorMessage, Spinner } from "../components/ui";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const {
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleRegister,
  } = useRegister();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT – Register Form */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-2xl font-bold text-purple-600">C.</div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Create account
          </h1>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px w-full bg-gray-200" />
            <span className="text-xs text-gray-400">or sign up with email</span>
            <div className="h-px w-full bg-gray-200" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <input
              type="text"
              placeholder="Full name"
              value={fullname}
              required
              disabled={isLoading}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <PasswordInput
              value={password}
              placeholder="Password"
              required
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition disabled:opacity-60"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT – Branding / Marketing */}
      <div className="relative hidden lg:flex items-center justify-center bg-white overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-10 right-20 h-40 w-40 rounded-full bg-orange-200 opacity-70" />
        <div className="absolute bottom-20 right-40 h-32 w-32 rounded-full bg-purple-200 opacity-70" />
        <div className="absolute bottom-32 left-24 h-48 w-48 rounded-full bg-cyan-200 opacity-70" />

        {/* Text */}
        <h2 className="relative z-10 text-4xl font-semibold text-gray-900 max-w-md text-center">
          Changing the way <br />
          the world writes
        </h2>
      </div>
    </div>
  );
}
