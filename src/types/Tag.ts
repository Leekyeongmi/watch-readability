//example
export interface ITag {
  id: number;
  slug: string;
  name: string;
  type: string;
  order: number;
}

class Tag implements ITag {
  constructor(
    public id: number,
    public slug: string,
    public name: string,
    public type: string,
    public order: number,
  ) {}

  public static factory(data: any): Tag {
    return new Tag(data?.id, data?.slug, data?.name, data?.type, data?.order);
  }
}

export default Tag;
