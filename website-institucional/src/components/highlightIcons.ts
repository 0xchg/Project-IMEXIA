import {
  Award,
  BedDouble,
  ClipboardCheck,
  CloudCog,
  Container,
  Droplet,
  MonitorSmartphone,
  Radar,
  Route,
  Ship,
  ShoppingCart,
  SquareCode,
  Stamp,
  Ticket,
  Warehouse,
  Wrench,
  Map as MapIcon,
  ChartNoAxesColumnIncreasing,
  CircleCheckBig,
  Cpu,
  Globe,
  Handshake,
  Headset,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Network,
  Package,
  Plane,
  Scale,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceId } from '../data/shared.ts'

// in the order of the pillars and values in the language files
export const pillarIcons = [Network, Workflow, ShieldCheck, HeartHandshake]
export const valueIcons = [Scale, Award, Handshake, Lightbulb, Shield]
export const strengthIcons = [CircleCheckBig, Handshake, Lightbulb, Leaf]

// one icon per area, for the hero's tabs and its artwork
export const areaIcons: Record<ServiceId, LucideIcon> = { viagens: Plane, logistica: Truck, software: Cpu }

// in the order of each slide's strengths
export const heroStrengthIcons: Record<ServiceId, LucideIcon[]> = {
  logistica: [Globe, ShieldCheck, ChartNoAxesColumnIncreasing, Users],
  software: [Sparkles, Share2, Shield, TrendingUp],
  viagens: [Package, Headset, CircleCheckBig, Plane],
}

// in the order of each area's features in the language files
export const featureIcons: Record<ServiceId, LucideIcon[]> = {
  logistica: [Truck, Ship, Plane, Warehouse, Route, ShoppingCart, ClipboardCheck, Droplet, Container, Radar],
  software: [SquareCode, MonitorSmartphone, CloudCog, Wrench],
  viagens: [Ticket, BedDouble, MapIcon, Stamp],
}
