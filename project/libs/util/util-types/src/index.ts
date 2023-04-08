export interface CRUDRepository<Entity, Id, Result> {
  findById(id: Id): Promise<Result | null>;

  create(item: Entity): Promise<Result>;

  update(id: Id, item: Entity): void;

  destroy(id: Id): Promise<void>;
}
