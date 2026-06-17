export type Result<D> = | 
  { success: true, data: D } | 
  { success: false, error: string };