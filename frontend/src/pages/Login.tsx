import { useLogin } from "../hooks/useLogin";
import GoogleAuthButton from "../components/GoogleAuthButton";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Status Messages */}
        {error && <ErrorMessage message={error} />}

        <GoogleAuthButton />

        <Divider />

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            disabled={isLoading}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            placeholder="Password"
            required
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>

        <FooterLink />
      </form>
    </div>
  );
}

/** * Sub-components (Can be moved to separate files)
 **/
const Divider = () => (
  <div className="flex items-center my-6">
    <div className="flex-grow border-t border-gray-300" />
    <span className="mx-4 text-gray-500 text-xs uppercase">OR</span>
    <div className="flex-grow border-t border-gray-300" />
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
    {message}
  </div>
);

const FooterLink = () => (
  <p className="text-sm text-center mt-6">
    Don't have an account?{" "}
    <a href="/register" className="text-blue-600 hover:underline font-medium">
      Register
    </a>
  </p>
);
