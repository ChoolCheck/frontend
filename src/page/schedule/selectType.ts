// declare module "react-select/dist/declarations/src/Select" {
//   export interface Props<
//     Option,
//     IsMulti extends boolean,
//     Group extends GroupBase<Option>
//   > {
//     myCustomProp: string;
//   }
// }

interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {}
interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}
export interface SelectOptionActionMeta<Option> extends ActionMetaBase<Option> {
  action: "select-option";
  option: Option | undefined;
  name?: string;
}

export interface DeselectOptionActionMeta<Option>
  extends ActionMetaBase<Option> {
  action: "deselect-option";
  option: Option | undefined;
  name?: string;
}
export interface ActionMetaBase<Option> {
  option?: Option | undefined;
  removedValue?: Option;
  removedValues?: Options<Option>;
  name?: string;
}
export type Options<Option> = readonly Option[];
// export type SingleValue<Option> = Option | null;
// export type MultiValue<Option> = readonly Option[];

// export type ActionMeta<Option> =
//   | SelectOptionActionMeta<Option>
//   | DeselectOptionActionMeta<Option>;
