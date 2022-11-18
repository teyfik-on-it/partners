import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ErrorWidget } from "../../shared/ErrorWidget";
import { fetchPartnersData, selectPartners, Status } from "./partnersSlice";
import { PartnerWidget } from "./PartnerWidget";

export const Partners = () => {
  const dispatch = useAppDispatch();
  const { error, items, status } = useAppSelector(selectPartners);

  useEffect(() => {
    if (status === Status.Initial) {
      dispatch(fetchPartnersData());
    }
  }, [dispatch, status]);

  return (
    <section>
      <header>
        <h2>Partners</h2>
      </header>

      <main>
        {error && status === Status.Error ? (
          <ErrorWidget message={error} />
        ) : null}
        {status === Status.Pending ? <p>Loading application data</p> : null}
        {status === Status.Idle
          ? items?.map((partner) => (
              <PartnerWidget key={partner.partner_id} partner={partner} />
            ))
          : null}
      </main>
    </section>
  );
};
