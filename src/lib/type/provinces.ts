export interface Provinces {
  name: string;
  code: number;
  division_type: DivisionType;
  codename: string;
  phone_code: number;
  districts: Districts[];
}

export enum DivisionType {
  Tỉnh = "tỉnh",
}

export interface Districts {
  name: string;
  code: number;
  division_type: DivisionType;
  codename: string;
  province_code: number;
  wards: Ward[];
}

export enum DivisionType {
  Huyện = "huyện",
}

export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}
