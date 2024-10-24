import { db } from './config';
import type { Agent, Report } from '../types';

export const agentOperations = {
  createAgent: async (agent: Agent): Promise<void> => {
    const tx = await db.transaction();
    
    try {
      await tx.execute({
        sql: `INSERT INTO agents (id, name, role, phoneNumber, socialLink, uplineId, rating) 
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          agent.id,
          agent.name,
          agent.role,
          agent.phoneNumber,
          agent.socialLink,
          agent.uplineId || null,
          agent.rating
        ]
      });
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      console.error('Failed to create agent:', error);
      throw error;
    }
  },

  getAllAgents: async (): Promise<Agent[]> => {
    try {
      const result = await db.execute('SELECT * FROM agents ORDER BY createdAt DESC');
      return result.rows as Agent[];
    } catch (error) {
      console.error('Failed to get agents:', error);
      throw error;
    }
  },

  updateAgent: async (agent: Agent): Promise<void> => {
    const tx = await db.transaction();
    
    try {
      await tx.execute({
        sql: `UPDATE agents 
              SET name = ?, role = ?, phoneNumber = ?, socialLink = ?, uplineId = ?, rating = ?
              WHERE id = ?`,
        args: [
          agent.name,
          agent.role,
          agent.phoneNumber,
          agent.socialLink,
          agent.uplineId || null,
          agent.rating,
          agent.id
        ]
      });
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      console.error('Failed to update agent:', error);
      throw error;
    }
  },

  deleteAgent: async (id: string): Promise<void> => {
    const tx = await db.transaction();
    
    try {
      await tx.execute({
        sql: 'DELETE FROM agents WHERE id = ?',
        args: [id]
      });
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      console.error('Failed to delete agent:', error);
      throw error;
    }
  }
};

export const reportOperations = {
  createReport: async (report: Omit<Report, 'id' | 'status' | 'createdAt'>): Promise<void> => {
    const tx = await db.transaction();
    
    try {
      await tx.execute({
        sql: `INSERT INTO reports (agentId, agentName, reportedById, reportedByName, reason, whatsappNumber)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          report.agentId,
          report.agentName,
          report.reportedById,
          report.reportedByName,
          report.reason,
          report.whatsappNumber
        ]
      });
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      console.error('Failed to create report:', error);
      throw error;
    }
  },

  getAllReports: async (): Promise<Report[]> => {
    try {
      const result = await db.execute('SELECT * FROM reports ORDER BY createdAt DESC');
      return result.rows as Report[];
    } catch (error) {
      console.error('Failed to get reports:', error);
      throw error;
    }
  },

  updateReportStatus: async (id: number, status: 'resolved' | 'rejected'): Promise<void> => {
    const tx = await db.transaction();
    
    try {
      await tx.execute({
        sql: 'UPDATE reports SET status = ? WHERE id = ?',
        args: [status, id]
      });
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      console.error('Failed to update report status:', error);
      throw error;
    }
  }
};