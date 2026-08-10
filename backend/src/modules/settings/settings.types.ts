export interface UpdateSettingDTO {
  key: string;
  value: string;
  description?: string;
  category?: string;
}

export interface BulkUpdateSettingsDTO {
  settings: UpdateSettingDTO[];
}
