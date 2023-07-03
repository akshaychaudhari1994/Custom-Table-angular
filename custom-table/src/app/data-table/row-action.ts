export interface RowAction {
    name: string,
    displayName: string,
    tooltip?: string,
    icon: string,
    type?: "normal" | "primary" | "accent" | "warn",
    isVisibleColumn?: string,
    isDisabledColumn?: string,
    iconColor?: string
}