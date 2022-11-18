import { memo } from "react";
import { useOfficeDistance } from "../../hooks/useOfficeDistance";
import { Partner } from "./partnerAPI";

interface Props {
  partner: Partner;
}

export const PartnerWidget = memo(
  ({ partner }: Props) => {
    const distance = useOfficeDistance(partner);

    return (
      <section>
        <header>{partner.name}</header>
        <main>
          <p>{distance.toFixed(2)}km away from the office.</p>
        </main>
      </section>
    );
  },
  (a, b) => a.partner.partner_id === b.partner.partner_id,
);
