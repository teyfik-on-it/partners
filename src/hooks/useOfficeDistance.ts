import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import { Partner } from "../features/partners/partnerAPI";
import { selectOffice } from "../features/partners/partnersSlice";
import { Point } from "../features/partners/Point";

export const useOfficeDistance = (partner: Partner) => {
  const office = useAppSelector(selectOffice);

  return useMemo(() => {
    if (office) {
      return Point.distance(office, partner);
    }

    return -1;
  }, [office, partner]);
};
