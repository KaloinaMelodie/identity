import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'div[app-admin-list-contact]',
  standalone: false,
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.css',
})
export class ListContactComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  isLoading = false;
  error: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  private loadContacts(): void {
    this.isLoading = true;
    this.error = null;

    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.filteredContacts = [...this.contacts];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des contacts.';
        this.isLoading = false;
      },
    });
  }

 
  
  confirmDelete(contact: any): void {
  const confirmed = confirm(
    `Voulez-vous vraiment supprimer le contact "${contact.name}" ?`
  );

  if (!confirmed) return;

  this.deleteContact(contact.id);
}

private deleteContact(id: string): void {
  this.contactService.deleteContact(id).subscribe({
    next: () => {
      this.contacts = this.contacts.filter(s => s.id !== id);
      this.filteredContacts = this.filteredContacts.filter(s => s.id !== id);
    },
    error: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression du service.");
    },
  });
}
}
