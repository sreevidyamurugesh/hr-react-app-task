import type { PersonaKey, FlowType } from './personas'

export type FlowMeta = {
  key: PersonaKey
  label: string
  subtitle: string
  description: string
}

export type FlowTypeMeta = {
  key: FlowType
  label: string
  subtitle: string
  description: string
}

export const PERSONA_FLOW_META: FlowMeta[] = [
  {
    key: 'employee',
    label: 'Payroll results',
    subtitle: 'Employee payroll output',
    description: 'Review pay statements, net pay, YTD totals, and payment confirmation for the current run.',
  },
  {
    key: 'admin',
    label: 'Payroll process',
    subtitle: 'Control center',
    description: 'Run payroll, validate alerts, post to finance, and release payment files for the period.',
  },
  {
    key: 'manager',
    label: 'Manager approvals',
    subtitle: 'Approval workflow',
    description: 'Approve team pay changes, one-time payments, and adjustments before the payroll closes.',
  },
]

export const FLOW_TYPE_META: FlowTypeMeta[] = [
  {
    key: 'run',
    label: 'Payroll run',
    subtitle: 'Control, approval & posting',
    description: 'Steps to execute, validate, and close the payroll cycle for the period.',
  },
  {
    key: 'output',
    label: 'Payroll output',
    subtitle: 'Results & reporting',
    description: 'Review pay statements, register reports, GL posting, and team cost output.',
  },
]

export const FLOW_TYPE_LINKS: Record<FlowType, { key: FlowType; label: string; description: string }> = {
  run: {
    key: 'output',
    label: 'View payroll output',
    description: 'Switch to pay results, registers, postings, and manager reports.',
  },
  output: {
    key: 'run',
    label: 'Return to payroll run',
    description: 'Return to the processing, validation, and finance posting workflow.',
  },
}

export const PERSONA_FLOW_LINKS: Record<PersonaKey, { prev?: PersonaKey; next?: PersonaKey }> = {
  employee: { next: 'admin' },
  admin: { prev: 'employee', next: 'manager' },
  manager: { prev: 'admin' },
}
