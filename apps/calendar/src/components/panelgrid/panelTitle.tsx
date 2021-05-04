import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import { Template } from '@src/components/template';

interface Props {
  width: number;
  template: 'milestoneTitle' | 'taskTitle' | 'alldayTitle';
  model: any;
}

export const PanelTitle: FunctionComponent<Props> = ({ width, template, model }) => (
  <div className={cls('panel-title')} style={{ width }}>
    <Template template={template} model={model} />
  </div>
);
