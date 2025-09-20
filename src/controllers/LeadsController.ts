import { Handler } from "express";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./Schemas/LeadsRequestSchema";
import { LeadsService } from "../services/LeadsService";

export class LeadsController {
    constructor(private readonly leadsServices: LeadsService) { }

    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query);
            const { page = "1", pageSize = "10" } = query

            const result = await this.leadsServices.getAllLeadsPaginated({
                ...query,
                page: +page,
                pageSize: +pageSize
            })

            res.json(result);
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body);
            const newLead = await this.leadsServices.createLead(body)
            res.status(201).json(newLead);
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const lead = await this.leadsServices.getLeadById(+req.params.id)
            res.json(lead);
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const body = UpdateLeadRequestSchema.parse(req.body);
            const updatedLead = await this.leadsServices.updateLead(id, body)
            res.json(updatedLead);
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const deletedLead = await this.leadsServices.deleteLead(id)
            res.json({ deletedLead });
        } catch (error) {
            next(error)
        }
    }
}