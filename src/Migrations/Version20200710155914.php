<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200710155914 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE entreprises ADD phone_id INT DEFAULT NULL, ADD description LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE entreprises ADD CONSTRAINT FK_56B1B7A93B7323CB FOREIGN KEY (phone_id) REFERENCES phones (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_56B1B7A93B7323CB ON entreprises (phone_id)');
        $this->addSql('ALTER TABLE addresses ADD complement VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE addresses DROP complement');
        $this->addSql('ALTER TABLE entreprises DROP FOREIGN KEY FK_56B1B7A93B7323CB');
        $this->addSql('DROP INDEX UNIQ_56B1B7A93B7323CB ON entreprises');
        $this->addSql('ALTER TABLE entreprises DROP phone_id, DROP description');
    }
}
