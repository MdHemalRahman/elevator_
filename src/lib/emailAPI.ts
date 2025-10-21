import { Order } from './supabase';

export const emailAPI = {
  async sendOrderConfirmation(order: Order) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'confirmation',
          order: order
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Email API error:', error);
      throw error;
    }
  },

  async sendOrderCancellation(order: Order) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'cancellation',
          order: order
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Email API error:', error);
      throw error;
    }
  }
};