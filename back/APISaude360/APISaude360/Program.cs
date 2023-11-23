using APISaude360;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Saude360.Data.Contexto;
using Saude360.Data.Repositorios;
using Saude360.Domain.Interfaces.Repositorios;
using Saude360.Domain.Interfaces.Servicos;
using Saude360.Domain.Servicos;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IUsuarioRepo, UsuarioRepo>();
builder.Services.AddScoped<IUsuarioServico, UsuarioServico>();

builder.Services.AddScoped<IAtividadeFisicaRepo, AtividadeFisicaRepo>();
builder.Services.AddScoped<IAtividadeFisicaServico, AtividadeFisicaServico>();

builder.Services.AddScoped<IAlimentacaoRepo, AlimentacaoRepo>();
builder.Services.AddScoped<IAlimentacaoServico, AlimentacaoServico>();

builder.Services.AddScoped<IEstadoEmocionalRepo, EstadoEmocionalRepo>();
builder.Services.AddScoped<IEstadoEmocionalServico, EstadoEmocionalServico>();

builder.Services.AddScoped<IGeralRepo, GeralRepo>();

builder.Services.AddDbContext<DataContexto>();
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(option => option.AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();



app.Run();
