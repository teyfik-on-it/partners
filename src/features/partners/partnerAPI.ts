export interface Office {
  latitude: string;
  longitude: string;
}

export interface Partner {
  latitude: string;
  partner_id: number;
  name: string;
  longitude: string;
}

export const getPartners = (): Promise<Partner[]> =>
  fetch("/data/partners.json").then((res) => res.json());

export const getOffice = (): Promise<Office> =>
  fetch("/data/office.json").then((res) => res.json());
