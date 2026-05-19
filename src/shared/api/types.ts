export interface IRawAttributeListItem {
  value: string | number;
  name: string;
  description?: string;
}

export interface IRawAttributeRange {
  min: number;
  max: number;
  step: number;
}

export interface IRawAttribute {
  code: number;
  name: string;
  current?: string | number | null;
  list?: IRawAttributeListItem[];
  range?: IRawAttributeRange;
}

export interface IDeviceConfig {
  attributes: IRawAttribute[];
}

export interface IBackendData {
  status?: string;
}

export interface IDevice {
  device_id: string;
  device_name: string;
  config: IDeviceConfig;
  backend_data?: IBackendData;
}

export interface IHaierEvoResponse {
  devices: IDevice[];
}
