import { Component } from 'react'
import LottieView from '../shared/lottie/LottieView.jsx'

/**
 * A page that crashes shows a way back instead of a blank screen.
 * Moving to another page clears it (resetKey).
 */
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Page crashed:', error, info?.componentStack)
  }

  componentDidUpdate(prev) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null })
  }

  render() {
    if (!this.state.error) return this.props.children
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false
    return (
      <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-3 bg-white px-6 text-center text-slate-900">
        {offline ? (
          <LottieView name="offline" className="h-40 w-40" />
        ) : (
          <img src="/favicon.png" alt="" width="64" height="64" />
        )}
        <h1 className="mt-2 text-2xl font-bold text-[#061a5c]">{offline ? 'You are offline' : 'This page did not load'}</h1>
        <p className="max-w-sm text-slate-600">
          {offline ? 'Check your connection, then try again.' : 'Something went wrong on our side. Try again, or go back to the start.'}
        </p>
        <div className="mt-3 flex gap-3">
          <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-[#061a5c] px-6 py-3 text-sm font-bold text-white">Try again</button>
          <a href="/" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-[#061a5c]">Go to start</a>
        </div>
      </div>
    )
  }
}
