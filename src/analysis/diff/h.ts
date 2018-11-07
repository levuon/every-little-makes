


export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(sel: string, data: VNodeData, children: VNodeChildren): VNode;

export function h(sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {},
    children: any,
    text: any,
    i: number;
  // children 是数组
  if(c !== undefined) {
    if(Array.isArray(c)) {
      children = c;
    } else if(typeof c === 'string' || typeof c === 'number') {
      text = c;
    } else if(c && c.sel) {
      children = [c]
    }
  } else if( b !== undefined) {
    if (Array.isArray(b)) {
      children = b;
    } else if (typeof c === 'string' || typeof c === 'number') {
      text = b;
    } else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }

}