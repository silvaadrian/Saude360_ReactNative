using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace APISaude360.Migrations
{
    /// <inheritdoc />
    public partial class novoBanco2211 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "senha",
                table: "Usuarios",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(128)");

            migrationBuilder.CreateTable(
                name: "AtividadeFisica",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    tipoExercicio = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    duracao = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    intensidade = table.Column<int>(type: "int", nullable: false),
                    dataCriacao = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AtividadeFisica", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AtividadeFisica");

            migrationBuilder.AlterColumn<string>(
                name: "senha",
                table: "Usuarios",
                type: "varchar(128)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);
        }
    }
}
