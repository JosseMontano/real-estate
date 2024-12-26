import { primaryColor } from "@/core/constants/colors";
import Btn from "@/core/components/form/button";
import { Input } from "@/core/components/form/input";
import { ShowModal } from "@/core/components/form/modal";
import { Follow, User } from "@/core/types/user";
import { Check } from "@/shared/assets/icons/check";
import { HeartFill } from "@/shared/assets/icons/heartFill";
import { HousesFills } from "@/shared/assets/icons/housesFills";
import { StarFill } from "@/shared/assets/icons/starFill";
import { options } from "../profile";
import { GeoIcon } from "@/shared/assets/icons/geo";
import HouseAdd from "@/shared/assets/icons/houseAdd";
import WhatsappIcon from "@/shared/assets/icons/whatsappIcon";
import FollowIcon from "@/shared/assets/icons/follow";
import FollowingIcon from "@/shared/assets/icons/following";
import { useFollowSchema } from "../validations/follow.schema";
import { useForm } from "@/core/hooks/useForm";
import { postFollow, postReport } from "../api/endpoints";
import { Language } from "@/core/store/language";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteFollow } from "@/features/dashQuestions/api/endpoints";
import { useReportSchema } from "../validations/report.schema";
import { useModal } from "@/core/hooks/useModal";
import FormComponent from "@/core/components/form/form";

type ParamsType = {
  isModalOpen: boolean;
  HandleSetIsModalOpen: () => void;
  user: User;
  calification: string;
  follow: string;
  reportUser: string;
  publications: string;
  favorites: string;
  addComment: string;
  btnAddRe: string;
  placeholderComment: string;
  stateBtn: options;
  setStateBtn: (state: options) => void;
  amountRE: number;
  amountREFavs: number;
  userLogged: User;
  btnEditUserLanguage: string;
  handleShowModalEditUser: () => void;
  handleShowCreateRE: () => void;
  handleRedirect: () => void;
  contact: string;
  averageComments: number;
  startToFollow: string;
  language: Language;
  updateFollowing: (val: Follow) => void;
  unfollow: (id: number) => void;
  reportProfile: string;
};
export const ContactInfo = ({
  user,
  isModalOpen,
  HandleSetIsModalOpen,
  calification,
  follow,
  reportUser,
  publications,
  favorites,
  addComment,
  placeholderComment,
  stateBtn,
  setStateBtn,
  amountRE,
  amountREFavs,
  userLogged,
/*   btnEditUserLanguage,
  handleShowModalEditUser, */
  handleShowCreateRE,
  btnAddRe,
  contact,
  handleRedirect,
  averageComments,
  startToFollow,
  language,
  updateFollowing,
  unfollow,
  reportProfile,
}: ParamsType) => {
  const isFollowingVar = !!userLogged?.following?.find(
    (v) => v.user_followed_id === user.id
  );

  const [unFollowState, setUnFollowState] = useState(0);

  const [isFollowing, setIsFollowing] = useState(isFollowingVar);

  const realEstateSchema = useFollowSchema();
  const reportSchema = useReportSchema();
  const { handleOnSubmit, setSuccessMsg, setErrorMsg } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      data.user_id = userLogged.id;
      data.user_followed_id = user.id;
      const res = await postFollow(data);

      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message[language]);
        setIsFollowing(true);
        console.log(res.val);
        updateFollowing(res.val);
      } else {
        setErrorMsg(res.message[language]);
      }
    },
  });

  const {
    handleStateModal: handleStateModalReport,
    isModalOpen: isModalReportOpen,
  } = useModal();

  const {
    handleOnSubmit: handleOnSubmitReport,
    setSuccessMsg: setSuccessMsgReport,
    setErrorMsg: SetErrorMsgReport,
    errors: errorsReport,
    register: registerReport,
    isPending: isPendingReport,
  } = useForm({
    schema: reportSchema,
    form: async (data) => {
      data.reporter_id = userLogged.id;
      data.user_reported_id = user.id;
      const res = await postReport(data);

      if (res.status == 200 || res.status == 201) {
        setSuccessMsgReport(res.message[language]);
        setIsFollowing(true);
      } else {
        SetErrorMsgReport(res.message[language]);
      }
    },
  });

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      unfollow(unFollowState);
      setIsFollowing(!isFollowing);
    },
  });

  return (
    <div className="flex flex-col gap-2 ">
      <div className="md:mt-6 flex flex-col gap-2">
        <div>
          <p className=" flex gap-4 ">
            <span className="font-semibold text-xl">
              {user.email.length > 10
                ? `${user.email.slice(0, 15)}...`
                : user.email}
            </span>
            <span className="flex items-center gap-1 ">
              <GeoIcon size={14} />
              <span>Cochabamba</span>
            </span>
          </p>
          <p className="text-secondary font-semibold">{user.username}</p>
        </div>

        <div>
          <label className="text-[#929191]">{calification}</label>
          <div className="flex gap-3 items-center">
            <p className="text-base md:text-2xl font-semibold ">
              {averageComments}
            </p>
            <div className="flex space-x-1">
              {[...Array(user.qualification)].map((_, i) => (
                <span key={i} className="text-yellow-300 text-base md:text-2xl">
                  <StarFill size="20" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-x-6 items-center flex-wrap md">
          {user == userLogged && (
            <div className="flex items-center w-auto gap-2 rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
              <HouseAdd size={20} />
              <button onClick={handleShowCreateRE}> {btnAddRe}</button>
            </div>
          )}

          {user != userLogged && (
            <div className="flex items-center w-auto gap-2 rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
              <WhatsappIcon size={20} />
              <button onClick={handleRedirect}> {contact}</button>
            </div>
          )}

          {userLogged == user ? (
            <div
              className="flex gap-1 items-center px-2 justify-center h-8 text-white rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
              style={{ background: primaryColor }}
            >
              <Check size="19" />
              <span>{follow}</span>
            </div>
          ) : isFollowing ? (
            <div
              className="flex gap-1 items-center px-2 justify-center h-8 text-white rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
              style={{ background: primaryColor }}
              onClick={() => {
                const unFollowId = userLogged?.following?.find(
                  (v) => v.user_followed_id === user.id
                )?.id;
                setUnFollowState(unFollowId ?? 0);
                mutateToState(unFollowId ?? 0);
              }}
            >
              <FollowingIcon size={19} />
              <span>{follow}</span>
            </div>
          ) : (
            <div
              className="flex gap-1 items-center px-2 justify-center h-8 text-primary border-primary border-2 rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
              onClick={handleOnSubmit}
            >
              <FollowIcon size={19} />
              <span>{startToFollow}</span>
            </div>
          )}
       {/*    {user == userLogged && (
            <button
              className="hover:bg-gray-100 rounded-lg text-gray-400"
              onClick={handleShowModalEditUser}
            >
              {btnEditUserLanguage}
            </button>
          )} */}

          {user != userLogged && (
            <button
              className="hover:bg-gray-100 rounded-lg text-gray-400"
              onClick={handleStateModalReport}
            >
              {reportUser}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex gap-7 items-center ">
          <div
            onClick={() => setStateBtn("Publications")}
            className={`flex relative pb-4 gap-2 border-b-[3px]  items-center ${
              stateBtn === "Publications"
                ? " border-secondary"
                : "border-transparent"
            } `}
          >
            <span className="absolute left-[14px] bg-secondary rounded-full text-[13px] h-4 w-4 flex items-center justify-center text-white">
              {amountRE}
            </span>
            <HousesFills size="23" />
            <button className="mt-1">{publications}</button>
          </div>

          {user == userLogged && (
            <div
              onClick={() => setStateBtn("Favorites")}
              className={`flex relative gap-2 pb-4 border-b-[3px] z-10  items-end ${
                stateBtn === "Favorites"
                  ? "border-secondary"
                  : "border-transparent"
              }`}
            >
              <span className="absolute left-[14px] top-[4px] bg-secondary rounded-full text-[13px] h-4 w-4 flex items-center justify-center text-white">
                {amountREFavs}
              </span>
              <HeartFill size="20" />
              <button className="mt-1">{favorites}</button>
            </div>
          )}
        </div>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
      <ShowModal
        title={addComment}
        isModalOpen={isModalOpen}
        setIsModalOpen={HandleSetIsModalOpen}
        children={
          <div className="flex flex-col gap-3">
            <Input text={placeholderComment} />
            <Btn isPending={false} text="Comentar" />
          </div>
        }
      />
      <ShowModal
        title={reportProfile}
        isModalOpen={isModalReportOpen}
        setIsModalOpen={handleStateModalReport}
        children={
          <FormComponent
            isPending={isPendingReport}
            handleOnSubmit={handleOnSubmitReport}
            btnText={reportUser}
            children={
              <Input
                error={errorsReport.reason}
                register={registerReport("reason")}
                text={reportUser}
              />
            }
          />
        }
      />
    </div>
  );
};
