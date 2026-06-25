import type { Block, Step } from '../data/personas'

type FieldsBlock = Extract<Block, { t: 'fields' }>
type TilesBlock = Extract<Block, { t: 'tiles' }>
type KpisBlock = Extract<Block, { t: 'kpis' }>
type HeroBlock = Extract<Block, { t: 'hero' }>
type BarsBlock = Extract<Block, { t: 'bars' }>
type TimelineBlock = Extract<Block, { t: 'timeline' }>
type TrendBlock = Extract<Block, { t: 'trend' }>
type TableBlock = Extract<Block, { t: 'table' }>
type PayslipBlock = Extract<Block, { t: 'payslip' }>
type DocsBlock = Extract<Block, { t: 'docs' }>
type ReviewBlock = Extract<Block, { t: 'review' }>
type ChecklistBlock = Extract<Block, { t: 'checklist' }>
type AlertsBlock = Extract<Block, { t: 'alerts' }>
type ChoicesBlock = Extract<Block, { t: 'choices' }>
type ActionsBlock = Extract<Block, { t: 'actions' }>
type NoteBlock = Extract<Block, { t: 'note' }>
type EsignBlock = Extract<Block, { t: 'esign' }>
type CompleteBlock = Extract<Block, { t: 'complete' }>

export function PayrollScreen({ step, mode, screenIndex }: { step: Step; mode: 'flow' | 'doc'; screenIndex: number }) {
  const renderFields = (block: FieldsBlock) => (
    <div className="block">
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="field-grid">
        {block.items.map((field: FieldsBlock['items'][number]) => {
          const empty = !(field.filled || field.select) && !field.val
          const classes = ['input']
          if (field.select) classes.push('select')
          if (field.filled) classes.push('filled')
          if (empty || (field.select && (!field.val || field.val === 'Select'))) classes.push('ph')
          const text = field.filled || field.select ? field.val || 'Select' : field.val || field.ph || ''
          return (
            <div key={field.label} className={`field ${field.full ? 'full' : ''}`}>
              <label>
                {field.label}
                {field.req ? <span className="req">*</span> : null}
              </label>
              <div className={classes.join(' ')}>{text}</div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderTiles = (block: TilesBlock) => (
    <div className="block" style={{ marginBottom: '24px' }}>
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="tiles">
        {block.items.map((item: TilesBlock['items'][number]) => (
          <div key={item.tt} className="tile">
            <div className="ti">{item.i}</div>
            <div className="tt">{item.tt}</div>
            <div className="ts">{item.ts}</div>
            {item.badge ? <span className="tb">{item.badge}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )

  const renderKpis = (block: KpisBlock) => (
    <div className="block" style={{ marginBottom: '24px' }}>
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="kpis">
        {block.items.map((item: KpisBlock['items'][number]) => (
          <div key={item.kl} className={`kpi ${item.tone || ''}`}>
            <div className="kv">{item.kv}</div>
            <div className="kl">{item.kl}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHero = (block: HeroBlock) => (
    <div className="block">
      <div className="hero">
        <div>
          <div className="hl">{block.label}</div>
          <div className="hv">{block.value}</div>
          {block.sub ? <div className="hs">{block.sub}</div> : null}
        </div>
        <div className="right">
          {block.status ? <span className="chip ok">{block.status}</span> : null}
          {block.delta ? <span className={`delta ${block.deltaClass || 'flat'}`}>{block.delta}</span> : null}
        </div>
      </div>
    </div>
  )

  const renderBars = (block: BarsBlock) => (
    <div className="block">
      {block.title ? <div className="block-title">{block.title}</div> : null}
      <div className="bars">
        {block.items.map((item: BarsBlock['items'][number]) => (
          <div key={item.label} className="bar">
            <div className="bh">
              <span className="bl">{item.label}</span>
              <span className="bvt">{item.val}</span>
            </div>
            <div className="track">
              <div className={`fillb ${item.tone || 't-blue'}`} style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTimeline = (block: TimelineBlock) => (
    <div className="block">
      {block.title ? <div className="block-title">{block.title}</div> : null}
      <div className="timeline">
        {block.steps.map((item: TimelineBlock['steps'][number]) => (
          <div key={item.label} className={`tl ${item.state || ''}`}>
            <div className="tdot">{item.state === 'done' ? '✓' : ''}</div>
            <div className="tlb">{item.label}</div>
            <div className="tls">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTrend = (block: TrendBlock) => {
    const max = Math.max(...block.items.map((item) => item.num), 1)
    return (
      <div className="block">
        {block.title ? <div className="block-title">{block.title}</div> : null}
        <div className="trend">
          {block.items.map((item: TrendBlock['items'][number]) => (
            <div key={item.label} className={`tcol ${item.hl ? 'hl' : ''}`}>
              <div className="tval">{item.text}</div>
              <div className="tbar" style={{ height: `${Math.max(4, Math.round((item.num / max) * 100))}%` }} />
              <div className="tlbl">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTable = (block: TableBlock) => (
    <div className="block">
      {block.title ? <div className="block-title">{block.title}</div> : null}
      <div className="tbl">
        <table>
          <thead>
            <tr>
              {block.cols.map((col) => (
                <th key={col.name} className={col.num ? 'num' : ''}>
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className={block.cols[cellIndex]?.num ? 'num' : ''}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {block.totals ? (
            <tfoot>
              <tr>
                {block.totals.map((cell, cellIndex) => (
                  <td key={cellIndex} className={block.cols[cellIndex]?.num ? 'num' : ''}>
                    {cell}
                  </td>
                ))}
              </tr>
            </tfoot>
          ) : null}
        </table>
        {block.cap ? <div className="cap">{block.cap}</div> : null}
      </div>
    </div>
  )

  const renderPayslip = (block: PayslipBlock) => (
    <div className="block">
      <div className="payslip">
        <div className="pay-head">
          <div>
            <div className="pp">Pay period</div>
            <div className="pv">{block.period}</div>
          </div>
          <div>
            <div className="pp">Pay date</div>
            <div className="pv">{block.payDate}</div>
          </div>
          <div>
            <div className="pp">Status</div>
            <div className="pv"><span className="chip ok">{block.status}</span></div>
          </div>
        </div>
        <div className="pay-colhead">
          <span>Description</span>
          <span>Current</span>
          <span>Year to date</span>
        </div>
        <div className="pay-sec">Earnings</div>
        {block.earnings.map((row: PayslipBlock['earnings'][number]) => (
          <div key={row.label} className="pay-row">
            <span className="pl">{row.label}</span>
            <span className="pc">{row.cur}</span>
            <span className="py">{row.ytd}</span>
          </div>
        ))}
        <div className="pay-row total">
          <span className="pl">Gross pay</span>
          <span className="pc">{block.gross.cur}</span>
          <span className="py">{block.gross.ytd}</span>
        </div>
        <div className="pay-sec">Taxes & deductions</div>
        {block.deductions.map((row: PayslipBlock['deductions'][number]) => (
          <div key={row.label} className="pay-row">
            <span className="pl">{row.label}</span>
            <span className="pc">{row.cur}</span>
            <span className="py">{row.ytd}</span>
          </div>
        ))}
        <div className="pay-row total">
          <span className="pl">Total deductions</span>
          <span className="pc">{block.ded.cur}</span>
          <span className="py">{block.ded.ytd}</span>
        </div>
        <div className="pay-net">
          <div>
            <div className="nl">Net pay</div>
            <div className="ns">Deposited to ••••4821</div>
          </div>
          <div className="nv">{block.net.cur}</div>
        </div>
      </div>
    </div>
  )

  const renderDocs = (block: DocsBlock) => (
    <div className="block">
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="docs">
        {block.items.map((item: DocsBlock['items'][number]) => (
          <div key={item.n} className="doc">
            <div className="fi" />
            <div>
              <div className="dn">{item.n}</div>
              <div className="dd">{item.d}</div>
            </div>
            <span className={`badge ${item.badge}`}>{item.bl}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderReview = (block: ReviewBlock) => (
    <div className="block">
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="review">
        {block.rows.map((row: ReviewBlock['rows'][number]) => (
          <div key={row[0]} className="rr">
            <span className="rk">{row[0]}</span>
            <span className="rv">{row[1]}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderChecklist = (block: ChecklistBlock) => (
    <div className="block">
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="checklist">
        {block.items.map((item: ChecklistBlock['items'][number]) => (
          <div key={item.c} className="ci">
            <span className={`mk ${item.s}`}>{item.s === 'done' ? '✓' : item.s === 'prog' ? '◔' : '·'}</span>
            <div className="ct">
              {item.c}
              {item.st ? <small>{item.st}</small> : null}
            </div>
            <span className={`st ${item.s}`}>{item.st}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAlerts = (block: AlertsBlock) => (
    <div className="block">
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="alerts">
        {block.items.map((item: AlertsBlock['items'][number]) => (
          <div key={item.title} className={`alert ${item.sev}`}>
            <span className="as">{item.icon}</span>
            <div>
              <div className="at">{item.title}</div>
              <div className="ad">{item.sub}</div>
            </div>
            <span className="ab">{item.ab}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderChoices = (block: ChoicesBlock) => (
    <div className="block">
      {block.title && <div className="block-title">{block.title}</div>}
      <div className="choices">
        {block.items.map((item: ChoicesBlock['items'][number]) => (
          <div key={item.l} className={`choice ${item.sel ? 'sel' : ''}`}>
            <div className="ra" />
            <div>
              <div className="cl">{item.l}</div>
              <div className="cs">{item.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderActions = (block: ActionsBlock) => (
    <div className="block">
      <div className="inline-actions">
        {block.items.map((item: ActionsBlock['items'][number]) => (
          <button key={item.label} className={`btn ${item.kind === 'primary' ? 'btn-primary' : ''}`} disabled>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )

  const renderNote = (block: NoteBlock) => (
    <div className="block">
      <div className={`note ${block.warn ? 'warn' : ''}`} dangerouslySetInnerHTML={{ __html: block.text }} />
    </div>
  )

  const renderEsign = (block: EsignBlock) => (
    <div className="block">
      <div className="esign">
        <div className="sig">{block.sig}</div>
        <div className="lbl">{block.lbl}</div>
      </div>
    </div>
  )

  const renderComplete = (block: CompleteBlock) => (
    <div className="block">
      <div className="complete-hero">
        <div className="ck">✓</div>
        <h2>{block.h}</h2>
        <p>{block.p}</p>
      </div>
    </div>
  )

  const renderBlock = (block: Block, index: number) => {
    switch (block.t) {
      case 'fields':
        return <div key={index}>{renderFields(block)}</div>
      case 'tiles':
        return <div key={index}>{renderTiles(block)}</div>
      case 'kpis':
        return <div key={index}>{renderKpis(block)}</div>
      case 'hero':
        return <div key={index}>{renderHero(block)}</div>
      case 'bars':
        return <div key={index}>{renderBars(block)}</div>
      case 'timeline':
        return <div key={index}>{renderTimeline(block)}</div>
      case 'trend':
        return <div key={index}>{renderTrend(block)}</div>
      case 'table':
        return <div key={index}>{renderTable(block)}</div>
      case 'payslip':
        return <div key={index}>{renderPayslip(block)}</div>
      case 'docs':
        return <div key={index}>{renderDocs(block)}</div>
      case 'review':
        return <div key={index}>{renderReview(block)}</div>
      case 'checklist':
        return <div key={index}>{renderChecklist(block)}</div>
      case 'alerts':
        return <div key={index}>{renderAlerts(block)}</div>
      case 'choices':
        return <div key={index}>{renderChoices(block)}</div>
      case 'actions':
        return <div key={index}>{renderActions(block)}</div>
      case 'note':
        return <div key={index}>{renderNote(block)}</div>
      case 'esign':
        return <div key={index}>{renderEsign(block)}</div>
      case 'complete':
        return <div key={index}>{renderComplete(block)}</div>
      default:
        return null
    }
  }

  return (
    <article className="screen">
      <div className="crumbs">
        Payroll › <span>{step.crumb}</span>
      </div>
      <header className="screen-head">
        <div className="row">
          {mode === 'doc' ? <span className="stepno">{screenIndex + 1}</span> : null}
          <h1>{step.title}</h1>
          <span className={`tag ${step.tagClass || ''}`}>{step.tag}</span>
        </div>
        {step.intro ? <p className="screen-intro">{step.intro}</p> : null}
      </header>
      <div className="screen-body">
        {step.blocks.map(renderBlock)}
      </div>
    </article>
  )
}
