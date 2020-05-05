<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200502234142 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE entreprises DROP FOREIGN KEY FK_56B1B7A95713BC80');
        $this->addSql('DROP INDEX IDX_56B1B7A95713BC80 ON entreprises');
        $this->addSql('ALTER TABLE entreprises DROP addresses_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE entreprises ADD addresses_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE entreprises ADD CONSTRAINT FK_56B1B7A95713BC80 FOREIGN KEY (addresses_id) REFERENCES addresses (id)');
        $this->addSql('CREATE INDEX IDX_56B1B7A95713BC80 ON entreprises (addresses_id)');
    }
}
