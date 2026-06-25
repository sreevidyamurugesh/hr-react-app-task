import type { FlowType, PersonaKey } from '../data/personas'
import { FLOW_TYPE_META, PERSONA_FLOW_META } from '../data/flowMeta'
import { getConnectedFlows, getFlowTypeLink } from '../services/flowService'

export function FlowMap({
  currentPersona,
  currentFlowType,
  onSwitchPersona,
  onSwitchFlowType,
}: {
  currentPersona: PersonaKey
  currentFlowType: FlowType
  onSwitchPersona: (key: PersonaKey) => void
  onSwitchFlowType: (type: FlowType) => void
}) {
  const links = getConnectedFlows(currentPersona)
  const flowTypeLink = getFlowTypeLink(currentFlowType)

  return (
    <section className="flow-map">
      <div className="flow-map-grid">
        {PERSONA_FLOW_META.map((step) => (
          <button
            key={step.key}
            type="button"
            className={`flow-step ${step.key === currentPersona ? 'active' : ''}`}
            onClick={() => onSwitchPersona(step.key)}
          >
            <div className="flow-step-label">{step.label}</div>
            <div className="flow-step-sub">{step.subtitle}</div>
          </button>
        ))}
      </div>

      <div className="flow-type-row">
        {FLOW_TYPE_META.map((type) => (
          <button
            key={type.key}
            type="button"
            className={`btn ${currentFlowType === type.key ? 'btn-primary' : ''}`}
            onClick={() => onSwitchFlowType(type.key)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="flow-map-help">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onSwitchFlowType(flowTypeLink.key)}
        >
          {flowTypeLink.label}
        </button>
        {links.map((link) => (
          <button key={link.key} type="button" className="btn btn-primary" onClick={() => onSwitchPersona(link.key)}>
            {link.label}
          </button>
        ))}
      </div>
    </section>
  )
}
