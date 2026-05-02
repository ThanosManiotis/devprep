'use client';
import { Component, type ReactNode } from 'react';
import styles from './EditorErrorBoundary.module.css';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class EditorErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.fallback}>
          <p>Editor failed to load.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
