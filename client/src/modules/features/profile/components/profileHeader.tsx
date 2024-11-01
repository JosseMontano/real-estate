import { StarFill } from "@/shared/assets/icons/starFill";
import profile from "@/shared/assets/profile.jpeg"

type ParamsType = {};
export const ProfileHeader = ({}: ParamsType) => {
  return (
    <div className="flex space-x-4 flex-col gap-2 w-full">
      <img
        className="w-96"
        src={profile}
        alt="Profile"
      />
      {/* <Profile size="450"/> */}

      <p>Comentarios</p>
      <div className="flex flex-row items-center gap-2">
        <p>Example@gmail.com</p>
        <div className="flex flex-col">
          <p className="text-xl font-semibold mx-1">5</p>
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-2xl">
                <StarFill size="20" />
              </span>
            ))}
            <span className="text-gray-400 text-2xl">
              {" "}
              <StarFill size="20" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
