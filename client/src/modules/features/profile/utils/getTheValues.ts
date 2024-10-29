import { Location } from "@/core/components/map/maps";
import { RealEstateDTO } from "../api/dtos";
import { handlePost } from "@/core/utils/fetch";

export const getTheValues =async (data:RealEstateDTO, location:Location|null)=>{
    data.latLong = `${location?.lat}, ${location?.lng}`;
    const payload = {
      ubication: data.latLong,
    };
    const res = await handlePost("real-estate", payload);
    data.address = res.val;

    //save title
    const resTitle = await handlePost("translate", {
      val: data.titleEs,
    });
    data.titleEn = resTitle.val.valEn;
    data.titlePt = resTitle.val.valPt;

    //save description
    const resDes = await handlePost("translate", {
      val: data.descriptionEs,
    });
    data.descriptionEn = resDes.val.valEn;
    data.descriptionPt = resDes.val.valPt;
    return data;
}