export interface GenericItem {
  id: number;
  label: string;
};

export interface Generic {
  [key: string]: Generic | GenericItem[];
};

const getById = (data: GenericItem[], id = -1) => data.find((item) => item.id === id) || data.find((item) => item.id === -1);

const filterNoDefault = (data: GenericItem[]) => data.filter((row) => row.id > -1);

const gen = (data: GenericItem[]) => ({
  value: data,
  get: (id = -1) => getById(data, id),
  getLabel: (id = -1) => getById(data, id)!.label,
  filterNoDefault: () => filterNoDefault(data),
});

const handler = {
  get: (target: Generic, prop: any): any => {
    if (Array.isArray(target)) {
      return gen(target);
    }

    if (prop in target) {
      const data = target[prop];
      return Array.isArray(data) ? gen(target[prop] as GenericItem[]) : new Proxy(data, handler);
    }

    return [];
  },
};

export const generic = (data: Generic) => new Proxy(data, handler);
