import type { FlowType, PersonaKey } from '../data/personas'
import { FLOW_TYPE_LINKS, FLOW_TYPE_META, PERSONA_FLOW_LINKS, PERSONA_FLOW_META, type FlowMeta, type FlowTypeMeta } from '../data/flowMeta'

export const getFlowMetaList = (): FlowMeta[] => PERSONA_FLOW_META

export const getFlowMeta = (key: PersonaKey): FlowMeta => {
  const meta = PERSONA_FLOW_META.find((item) => item.key === key)
  if (!meta) throw new Error(`Unknown persona flow key: ${key}`)
  return meta
}

export const getFlowTypeMetaList = (): FlowTypeMeta[] => FLOW_TYPE_META

export const getFlowTypeMeta = (key: FlowType): FlowTypeMeta => {
  const meta = FLOW_TYPE_META.find((item) => item.key === key)
  if (!meta) throw new Error(`Unknown flow type key: ${key}`)
  return meta
}

export const getFlowTypeLink = (key: FlowType) => FLOW_TYPE_LINKS[key]

export const getDefaultFlowType = (): FlowType => FLOW_TYPE_META[1].key

export const getConnectedFlows = (key: PersonaKey): Array<{ key: PersonaKey; label: string; description: string }> => {
  const links = PERSONA_FLOW_LINKS[key]
  if (!links) return []
  const targets: Array<{ key: PersonaKey; label: string; description: string }> = []
  if (links.prev) {
    const prev = getFlowMeta(links.prev)
    targets.push({ key: prev.key, label: `Back to ${prev.label}`, description: prev.description })
  }
  if (links.next) {
    const next = getFlowMeta(links.next)
    targets.push({ key: next.key, label: `Continue to ${next.label}`, description: next.description })
  }
  return targets
}

export const getDefaultPersona = (): PersonaKey => PERSONA_FLOW_META[0].key
