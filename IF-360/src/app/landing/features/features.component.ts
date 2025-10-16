import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
})
export class FeaturesComponent {
  features = [
    {
      icon: '⚡',
      title: 'Real-time updates',
      description: 'Live socket updates that keep customers and vendors in sync.'
    },
    {
      icon: '📈',
      title: 'Actionable analytics',
      description: 'OLAP-driven dashboards for admin decision-making.'
    },
    {
      icon: '🔒',
      title: 'Secure & reliable',
      description: 'Role-based access, JWT auth and Redis-backed sessions.'
    },
  ];
}
