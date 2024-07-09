const ctx = {
  props: {} as Record<string, unknown>,
};

export abstract class AbstractFrameworkContext {
  getInstance() {
    return this;
  }
  resetProps() {
    ctx.props = {};
  }

  addProps(props: Record<string, unknown>) {
    return (ctx.props = { ...ctx.props, ...props });
  }

  getProps() {
    return ctx.props;
  }
  abstract staticProps(): Record<string, unknown>;
}

export class ServerFrameworkContext extends AbstractFrameworkContext {
  staticProps() {
    return ctx.props;
  }
}
