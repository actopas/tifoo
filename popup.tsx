import React, { useEffect, useState } from "react";
import "@/styles";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import PlanIcon from "@/components/icons/PlanIcon";

const truncateEmail = (email: string) => {
  const [username] = email.split("@");
  if (username.length <= 6) return username;
  return `${username.slice(0, 6)}...`;
};

const getAvatarText = (email: string) => {
  const [username] = email.split("@");
  if (username.length === 1) return username.toUpperCase();
  return username.slice(0, 2).toUpperCase();
};

const UserAvatar = ({ user, signOut }: { user: any; signOut: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-7 w-7 bg-white text-[#1DA1F2] flex items-center justify-center rounded-full text-sm font-medium">
        {getAvatarText(user.email)}
      </div>
      <div className="relative overflow-hidden">
        <span
          className={`text-sm text-white inline-block transition-transform duration-300 ${
            isHovered
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {truncateEmail(user.email)}
        </span>
        <span
          className={`text-sm text-white absolute left-0 top-0 inline-block transition-transform duration-300 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
          onClick={signOut}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
};

const IndexPopup = () => {
  const [isActive, setIsActive] = useState(false);
  const { user, signOut } = useAuth();

  const sendMessageToActiveTab = async (message: any) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.id) {
      return chrome.tabs.sendMessage(tab.id, message);
    }
  };

  useEffect(() => {
    const initState = async () => {
      try {
        const response = await sendMessageToActiveTab({ action: "getState" });
        if (response?.isActive !== undefined) {
          setIsActive(response.isActive);
        }
      } catch (error) {
        console.error("Failed to get initial state:", error);
      }
    };

    initState();
  }, []);

  const handleToggle = async () => {
    try {
      const newState = !isActive;
      await sendMessageToActiveTab({
        action: "toggleTifoo",
        isActive: newState,
      });
      setIsActive(newState);
      setTimeout(() => {
        window.close();
      }, 500);
    } catch (error) {
      console.error("Failed to toggle state:", error);
    }
  };

  return (
    <div>
      <div className="w-80">
        <div className="bg-[#1DA1F2] text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`font-caprasimo text-xl`}>tifoo</span>
          </div>
          {!user ? (
            <button
              className="px-3 py-1 rounded-full bg-white text-[#1DA1F2] text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
              onClick={() =>
                window.open("http://localhost:3000/signin", "_blank")
              }
            >
              Sign In
            </button>
          ) : (
            <UserAvatar user={user} signOut={signOut} />
          )}
        </div>
        <div className="p-4 space-y-4">
          <p className="text-[#657786] text-sm font-mono text-center">
            Effortless Tailwind Stylings, Now!
          </p>
          <button
            className={`w-full py-2 px-4 rounded-full text-white font-medium transition-all duration-300 ${
              isActive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#1DA1F2] hover:bg-[#0C7ABF]"
            } hover:shadow-md transform hover:-translate-y-0.5`}
            onClick={handleToggle}
          >
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
        <div className="bg-[#E8F5FE] p-3 flex justify-between items-center text-xs text-[#657786]">
          {user && (
            <span className="flex items-center gap-2">
              <PlanIcon type="free" />
              Free Plan
            </span>
          )}
          <a
            href={process.env.PLASMO_PUBLIC_GITHUB_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1DA1F2] transition-colors duration-300"
          >
            Report an issue
          </a>
        </div>
      </div>
    </div>
  );
};

const Popup = () => {
  return (
    <AuthProvider>
      <IndexPopup />
    </AuthProvider>
  );
};

export default Popup;
