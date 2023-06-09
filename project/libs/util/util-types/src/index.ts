export interface CRUDRepository<InputType, OutputType, Id> {
  findById?(id: Id): Promise<OutputType | null>;

  create?(item: InputType): Promise<void>;

  update?(id: Id, item: InputType): Promise<void>;

  destroy?(id: Id): Promise<void>;
}
