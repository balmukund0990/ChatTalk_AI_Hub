export interface chattalkaiPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
