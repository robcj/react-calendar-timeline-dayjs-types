import { Dayjs } from 'dayjs';
import * as React from 'react';

declare module 'react-calendar-timeline-dayjs' {
  type Id = number | string;

  export interface TimelineGroupBase {
    id: Id;
    title: React.ReactNode;
    rightTitle?: React.ReactNode | undefined;
    height?: number | undefined;
    stackItems?: boolean | undefined;
  }

  export interface TimelineItemBase<DateType> {
    id: Id;
    group: Id;
    title?: React.ReactNode | undefined;
    start_time: DateType;
    end_time: DateType;
    canMove?: boolean | undefined;
    canResize?: boolean | 'left' | 'right' | 'both' | undefined;
    canChangeGroup?: boolean | undefined;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    itemProps?: React.HTMLAttributes<HTMLDivElement> | undefined;
  }

  export type TimelineItem<CustomItemFields, DateType = number> = TimelineItemBase<DateType> &
    CustomItemFields;
  export type TimelineGroup<CustomGroupFields> = TimelineGroupBase & CustomGroupFields;

  export interface TimelineContext {
    timelineWidth: number;
    visibleTimeStart: number;
    visibleTimeEnd: number;
    canvasTimeStart: number;
    canvasTimeEnd: number;
  }

  export interface ItemContext {
    dimensions: {
      collisionLeft: number;
      collisionWidth: number;
      height: number;
      isDragging: boolean;
      left: number;
      order: {
        group: {
          id: string;
        };
        index: number;
      };
      originalLeft: number;
      stack: boolean;
      top: number | null;
      width: number;
    };
    useResizeHandle: boolean;
    title: string;
    canMove: boolean;
    canResizeLeft: boolean;
    canResizeRight: boolean;
    selected: boolean;
    dragging: boolean;
    dragStart: {
      x: number;
      y: number;
    };
    dragTime: number;
    dragGroupDelta: number;
    resizing: boolean;
    resizeEdge: 'left' | 'right';
    resizeStart: number;
    resizeTime: number;
    width: boolean;
  }

  export interface TimeFormat {
    long: string;
    mediumLong: string;
    medium: string;
    short: string;
  }

  export interface LabelFormat {
    year: TimeFormat;
    month: TimeFormat;
    week: TimeFormat;
    day: TimeFormat;
    hour: TimeFormat;
    minute: TimeFormat;
  }

  export interface ItemRendererGetItemPropsReturnType {
    key: Id;
    ref: React.Ref<any>;
    className: string;
    onMouseDown: React.MouseEventHandler;
    onMouseUp: React.MouseEventHandler;
    onTouchStart: React.TouchEventHandler;
    onTouchEnd: React.TouchEventHandler;
    onDoubleClick: React.MouseEventHandler;
    onContextMenu: React.ReactEventHandler;
    style: React.CSSProperties;
  }

  export type GetItemsProps = Partial<Omit<ItemRendererGetItemPropsReturnType, 'key' | 'ref'>>;

  export interface ItemRendererGetResizePropsReturnType {
    left?:
      | {
          ref: React.Ref<any>;
          className: string;
          style: React.CSSProperties;
        }
      | undefined;
    right?:
      | {
          ref: React.Ref<any>;
          className: string;
          style: React.CSSProperties;
        }
      | undefined;
  }

  export type GetResizeProps = {
    leftStyle?: React.CSSProperties | undefined;
    rightStyle?: React.CSSProperties | undefined;
    leftClassName?: string | undefined;
    rightClassName?: string | undefined;
  };

  export interface ReactCalendarItemRendererProps<
    CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
  > {
    item: CustomItem;
    itemContext: ItemContext;
    getItemProps: (props: GetItemsProps) => {
      key: Id;
      ref: React.Ref<any>;
      className: string;
      onMouseDown: React.MouseEventHandler;
      onMouseUp: React.MouseEventHandler;
      onTouchStart: React.TouchEventHandler;
      onTouchEnd: React.TouchEventHandler;
      onDoubleClick: React.MouseEventHandler;
      onContextMenu: React.ReactEventHandler;
      style: React.CSSProperties;
    };
    getResizeProps: (propsOverride?: GetResizeProps) => ItemRendererGetResizePropsReturnType;
  }

  export interface ReactCalendarGroupRendererProps<
    CustomGroup extends TimelineGroupBase = TimelineGroupBase,
  > {
    group: CustomGroup;
    isRightSidebar?: boolean | undefined;
  }

  export interface OnItemDragObjectBase {
    eventType: 'move' | 'resize';
    itemId: Id;
    time: number;
  }

  export interface OnItemDragObjectMove extends OnItemDragObjectBase {
    eventType: 'move';
    newGroupOrder: number;
  }

  export interface OnItemDragObjectResize extends OnItemDragObjectBase {
    eventType: 'resize';
    edge?: 'left' | 'right' | undefined;
  }

  export interface TimelineKeys {
    groupIdKey: string;
    groupTitleKey: string;
    groupRightTitleKey: string;
    itemIdKey: string;
    itemTitleKey: string;
    itemDivTitleKey: string;
    itemGroupKey: string;
    itemTimeStartKey: string;
    itemTimeEndKey: string;
  }

  export interface ReactCalendarTimelineProps<
    CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
    CustomGroup extends TimelineGroupBase = TimelineGroupBase,
  > {
    children?: React.ReactNode;
    groups: CustomGroup[];
    items: CustomItem[];
    keys?: TimelineKeys | undefined;
    defaultTimeStart?: Date | Dayjs | undefined;
    defaultTimeEnd?: Date | Dayjs | undefined;
    visibleTimeStart?: Date | Dayjs | number | undefined;
    visibleTimeEnd?: Date | Dayjs | number | undefined;
    selected?: Id[] | undefined;
    sidebarWidth?: number | undefined;
    sidebarContent?: React.ReactNode | undefined;
    rightSidebarWidth?: number | undefined;
    rightSidebarContent?: React.ReactNode | undefined;
    dragSnap?: number | undefined;
    minResizeWidth?: number | undefined;
    lineHeight?: number | undefined;
    itemHeightRatio?: number | undefined;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    clickTolerance?: number | undefined;
    canMove?: boolean | undefined;
    canChangeGroup?: boolean | undefined;
    canResize?: false | true | 'left' | 'right' | 'both' | undefined;
    useResizeHandle?: boolean | undefined;
    stackItems?: boolean | undefined;
    traditionalZoom?: boolean | undefined;
    itemTouchSendsClick?: boolean | undefined;
    timeSteps?: TimelineTimeSteps | undefined;
    scrollRef?: React.Ref<any> | undefined;
    onItemDrag?(itemDragObject: OnItemDragObjectMove | OnItemDragObjectResize): void;
    onItemMove?(itemId: Id, dragTime: number, newGroupOrder: number): void;
    onItemResize?(itemId: Id, endTimeOrStartTime: number, edge: 'left' | 'right'): void;
    onItemSelect?(itemId: Id, e: any, time: number): void;
    onItemDeselect?(e: React.SyntheticEvent): void;
    onItemClick?(itemId: Id, e: React.SyntheticEvent, time: number): void;
    onItemDoubleClick?(itemId: Id, e: React.SyntheticEvent, time: number): void;
    onItemContextMenu?(itemId: Id, e: React.SyntheticEvent, time: number): void;
    onCanvasClick?(groupId: Id, time: number, e: React.SyntheticEvent): void;
    onCanvasDoubleClick?(groupId: Id, time: number, e: React.SyntheticEvent): void;
    onCanvasContextMenu?(groupId: Id, time: number, e: React.SyntheticEvent): void;
    onZoom?(timelineContext: TimelineContext, unit: Unit): void;
    moveResizeValidator?(
      action: 'move' | 'resize',
      itemId: Id,
      time: number,
      resizeEdge: 'left' | 'right'
    ): number;
    onTimeChange?(
      visibleTimeStart: number,
      visibleTimeEnd: number,
      updateScrollCanvas: (start: number, end: number) => void,
      unit: Unit
    ): any;
    onBoundsChange?(canvasTimeStart: number, canvasTimeEnd: number): any;
    itemRenderer?:
      | ((props: ReactCalendarItemRendererProps<CustomItem>) => React.ReactNode)
      | undefined;
    groupRenderer?:
      | ((props: ReactCalendarGroupRendererProps<CustomGroup>) => React.ReactNode)
      | undefined;
    resizeDetector?: ((containerResizeDetector: any) => void) | undefined;
    verticalLineClassNamesForTime?:
      | ((start: number, end: number) => string[] | undefined)
      | undefined;
    horizontalLineClassNamesForGroup?: ((group: CustomGroup) => string[]) | undefined;
    buffer?: number | undefined;
    // Fields that are in propTypes but not documented
    headerRef?: React.Ref<any> | undefined;
    className?: string;
  }

  export interface TimelineTimeSteps {
    second: number;
    minute: number;
    hour: number;
    day: number;
    month: number;
    year: number;
  }

  export class TimelineMarkers extends React.Component {}

  export interface CustomMarkerChildrenProps {
    styles: React.CSSProperties;
    date: number;
  }
  export interface MarkerProps {
    date: Date | number;
    children?: ((props: CustomMarkerChildrenProps) => React.ReactNode) | undefined;
  }

  export class CustomMarker extends React.Component<MarkerProps> {}

  export interface TodayMarkerProps extends MarkerProps {
    interval?: number | undefined;
  }
  export class TodayMarker extends React.Component<TodayMarkerProps> {}

  export type CursorMarkerProps = Omit<MarkerProps, 'date'>;
  export class CursorMarker extends React.Component<CursorMarkerProps> {}

  export interface TimelineHeadersProps {
    children?: React.ReactNode;
    style?: React.CSSProperties | undefined;
    className?: string | undefined;
    calendarHeaderStyle?: React.CSSProperties | undefined;
    calendarHeaderClassName?: string | undefined;
    headerRef?: React.Ref<any> | undefined;
  }
  export class TimelineHeaders extends React.Component<TimelineHeadersProps> {}

  export type TimelineHeaderProps = TimelineHeadersProps;

  export interface SidebarHeaderChildrenFnProps<Data> {
    getRootProps: (propsToOverride?: { style: React.CSSProperties }) => {
      style: React.CSSProperties;
    };
    data: Data;
  }

  export interface SidebarHeaderProps<Data> {
    variant?: 'left' | 'right' | undefined;
    headerData?: Data | undefined;
    children: (props: SidebarHeaderChildrenFnProps<Data>) => React.ReactNode;
  }
  export class SidebarHeader<Data = any> extends React.Component<SidebarHeaderProps<Data>> {}

  export type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'isoWeek' | 'month' | 'year';

  export interface IntervalContext {
    interval: { startTime: Dayjs; endTime: Dayjs; labelWidth: number; left: number };
    intervalText: string;
  }
  export interface GetIntervalProps {
    interval?: Interval | undefined;
    style?: React.CSSProperties | undefined;
    onClick?: React.MouseEventHandler | undefined;
  }
  export interface IntervalRenderer<Data> {
    intervalContext: IntervalContext;
    getIntervalProps: (
      props?: GetIntervalProps
    ) => Required<GetIntervalProps> & { key: string | number };
    data?: Data | undefined;
  }
  export interface DateHeaderProps<Data> {
    style?: React.CSSProperties | undefined;
    className?: string | undefined;
    unit?: Unit | 'primaryHeader' | undefined;
    labelFormat?:
      | string
      | (([startTime, endTime]: [Dayjs, Dayjs], unit: Unit, labelWidth: number) => string)
      | undefined;
    intervalRenderer?: ((props?: IntervalRenderer<Data>) => React.ReactNode) | undefined;
    headerData?: Data | undefined;
    children?: ((props: SidebarHeaderChildrenFnProps<Data>) => React.ReactNode) | undefined;
    height?: number | undefined;
  }
  export class DateHeader<Data = any> extends React.Component<DateHeaderProps<Data>> {}
  export interface Interval {
    startTime: Dayjs;
    endTime: Dayjs;
  }
  export interface HeaderContext {
    intervals: { startTime: Dayjs; endTime: Dayjs }[];
    unit: string;
  }
  export interface CustomHeaderPropsChildrenFnProps<Data> {
    timelineContext: TimelineContext;
    headerContext: HeaderContext;
    getIntervalProps: (
      props?: GetIntervalProps
    ) => Required<GetIntervalProps> & { key: string | number };
    getRootProps: (propsToOverride?: { style: React.CSSProperties }) => {
      style: React.CSSProperties;
    };
    showPeriod: (startDate: Dayjs | number, endDate: Dayjs | number) => void;
    data: Data;
  }
  export interface CustomHeaderProps<Data> {
    unit?: Unit | undefined;
    headerData?: Data | undefined;
    height?: number | undefined;
    children: (props?: CustomHeaderPropsChildrenFnProps<Data>) => React.ReactNode;
  }
  export class CustomHeader<Data = any> extends React.Component<CustomHeaderProps<Data>> {}

  export const defaultKeys: TimelineKeys;
  export const defaultTimeSteps: TimelineTimeSteps;
  export const defaultHeaderFormats: LabelFormat;

  export default class ReactCalendarTimeline<
    CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
    CustomGroup extends TimelineGroupBase = TimelineGroupBase,
  > extends React.Component<ReactCalendarTimelineProps<CustomItem, CustomGroup>> {}
}

