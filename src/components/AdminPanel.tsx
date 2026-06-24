import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const [newLink, setNewLink] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Link@69") {
      setIsAuthenticated(true);
      setError("");
      fetchCurrentLink();
    } else {
      setError("Invalid password");
    }
  };

  const fetchCurrentLink = async () => {
    try {
      const res = await fetch("/api/link");
      if (res.ok) {
        const data = await res.json();
        setCurrentLink(data.link);
        setNewLink(data.link);
      }
    } catch (err) {
      console.error("Failed to fetch link", err);
    }
  };

  const handleUpdateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, link: newLink }),
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentLink(data.link);
        setMessage("Link updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Failed to update link");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("An error occurred");
      setTimeout(() => setError(""), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Manage Redirect Link
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Update the link that users are redirected to after the loading screen finishes.
              </p>
            </div>
            <div className="mt-5">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">Current Link: </span>
                <span className="text-sm text-gray-900 break-all">{currentLink}</span>
              </div>
              <form onSubmit={handleUpdateLink} className="space-y-4">
                <div>
                  <label htmlFor="new-link" className="sr-only">
                    New Link
                  </label>
                  <input
                    type="url"
                    name="new-link"
                    id="new-link"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                    placeholder="https://example.com"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
                >
                  Update Link
                </button>
              </form>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
