import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { StatsCard } from '../components/Icons';
import { DataType } from '../types';

interface DashboardProps {
  data: DataType;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { statistiques, repartitionPaiements, ventesParMois, topClients } = data;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
          <i className='fas fa-chart-line text-blue-600'></i>
          Tableau de Bord
        </h1>
        <p className='text-gray-600 mt-1'>Vue d'ensemble des statistiques du BDE SUPINFO</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
        <StatsCard title='Total des Ventes' value={`${statistiques.totalVentes.toFixed(2)} €`} icon='euro-sign' color='green' trend={{ value: 12.5, isPositive: true }} />
        <StatsCard title='Bénéfice' value={`${statistiques.benefice.toFixed(2)} €`} icon='chart-line' color='blue' trend={{ value: 8.3, isPositive: true }} />
        <StatsCard title='Nombre de Clients' value={statistiques.nombreClients} icon='users' color='purple' />
        <StatsCard title='Nombre de Commandes' value={statistiques.nombreCommandes} icon='shopping-cart' color='orange' />
        <StatsCard title='Produits Disponibles' value={statistiques.nombreProduits} icon='box' color='blue' />
        <StatsCard title='Heure Moyenne' value={statistiques.heureMoyenneCommande} icon='clock' color='purple' />
      </div>

      {/* Produit le Plus Vendu */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center gap-2 mb-4'>
          <div className='w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center'>
            <i className='fas fa-award text-white text-lg'></i>
          </div>
          <h2 className='text-xl font-bold text-gray-900'>Produit le Plus Vendu</h2>
        </div>
        <div className='flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-5 rounded-lg'>
          <div>
            <p className='text-2xl font-bold text-gray-900'>{statistiques.produitPlusVendu.nom}</p>
            <p className='text-gray-600 mt-1'>Meilleure promo: {statistiques.meilleurePromo}</p>
          </div>
          <div className='text-right'>
            <p className='text-3xl font-bold text-orange-600'>{statistiques.produitPlusVendu.quantite}</p>
            <p className='text-sm text-gray-600'>unités vendues</p>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='bg-gray-50 border border-gray-200 p-4 rounded-lg'>
            <p className='text-sm text-gray-600 mb-1'>Moyenne par commande</p>
            <p className='text-xl font-bold text-gray-900'>{statistiques.moyenneEurosParCommande.toFixed(2)} €</p>
          </div>
          <div className='bg-gray-50 border border-gray-200 p-4 rounded-lg'>
            <p className='text-sm text-gray-600 mb-1'>Total dépenses</p>
            <p className='text-xl font-bold text-gray-900'>{statistiques.totalDepense.toFixed(2)} €</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6'>
        {/* Pie Chart - Répartition des Paiements */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <i className='fas fa-chart-pie text-blue-600'></i>
            Répartition des Moyens de Paiement
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie data={repartitionPaiements as any} cx='50%' cy='50%' labelLine={false} label={(entry: any) => `${entry.type}: ${entry.pourcentage}%`} outerRadius={100} fill='#8884d8' dataKey='pourcentage'>
                {repartitionPaiements.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className='mt-4 space-y-2'>
            {repartitionPaiements.map((payment, index) => (
              <div key={index} className='flex items-center justify-between p-2 rounded hover:bg-gray-50'>
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 rounded' style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className='text-sm text-gray-700'>{payment.type}</span>
                </div>
                <span className='text-sm font-semibold text-gray-900'>{payment.pourcentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Ventes par Mois */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <i className='fas fa-chart-bar text-blue-600'></i>
            Évolution des Ventes
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={ventesParMois}>
              <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
              <XAxis dataKey='mois' stroke='#6b7280' />
              <YAxis stroke='#6b7280' />
              <Tooltip />
              <Legend />
              <Bar dataKey='montant' fill='#3b82f6' name='Montant (€)' radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Clients */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Top 10 Clients par Commandes */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <i className='fas fa-trophy text-yellow-500'></i>
            Top Clients par Commandes
          </h2>
          <div className='space-y-2'>
            {topClients.parCommandes.map((client, index) => (
              <div key={index} className='flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200'>
                <div className='flex items-center gap-3'>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${index === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-600' : index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' : index === 2 ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>{index + 1}</div>
                  <span className='font-medium text-gray-900'>{client.nom}</span>
                </div>
                <span className='text-lg font-bold text-blue-600'>{client.nombreCommandes}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 10 Clients par Produits */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <i className='fas fa-medal text-green-500'></i>
            Top Clients par Produits
          </h2>
          <div className='space-y-2'>
            {topClients.parProduits.map((client, index) => (
              <div key={index} className='flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200'>
                <div className='flex items-center gap-3'>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${index === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-600' : index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' : index === 2 ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-gradient-to-br from-green-500 to-emerald-600'}`}>{index + 1}</div>
                  <span className='font-medium text-gray-900'>{client.nom}</span>
                </div>
                <span className='text-lg font-bold text-green-600'>{client.nombreProduits}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
