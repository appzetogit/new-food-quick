import "./loader.css"

/**
 * Shown while a page's code is on its way. It waits a moment before appearing, so
 * a page that loads quickly never flashes a loader.
 *
 * inline: fills the page area only, leaving the header and bottom bar usable.
 */
export default function Loader({ inline = false }) {
  return (
    <div role="status" aria-label="Loading" className={inline ? "aodo-loader aodo-loader--inline" : "aodo-loader"}>
      <span className="aodo-loader__bar" aria-hidden="true" />
      <img className="aodo-loader__mark" src="/favicon.png" alt="" width="64" height="64" />
    </div>
  )
}
