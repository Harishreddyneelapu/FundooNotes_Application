import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import app from '../../src/index';


let authToken;
let noteId;
let resetToken;
describe('User APIs Test', () => {


  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /api/users', () => {
    it('should register a new user', (done) => {
      const newUser = {
        FirstName: 'Test',
        LastName: 'User',
        Email: 'test@gmail.com',
        Password: 'Test@1234',
        ConfirmPassword: 'Test@1234'
      };
      request(app)
        .post('/api/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('FirstName');
          expect(res.body.data.FirstName).to.equal(newUser.FirstName);
          expect(res.body.data).to.have.property('LastName');
          expect(res.body.data.LastName).to.equal(newUser.LastName);
          expect(res.body.data).to.have.property('Email');
          expect(res.body.data.Email).to.equal(newUser.Email);
          done();
        });
    });

    it('should return an error for invalid registration data', (done) => {
      const invalidUser = {
        FirstName: 'Test',
        LastName: 'User',
        Email: 'invalidemail',
        Password: 'Test@1234',
        ConfirmPassword: 'Test@1234'
      };
      request(app)
        .post('/api/users')
        .send(invalidUser)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });

  });

  describe('POST /api/users/login', () => {
    it('should login a user', (done) => {
      const loginUser = {
        Email: 'test@gmail.com',
        Password: 'Test@1234'
      };
      request(app)
        .post('/api/users/login')
        .send(loginUser)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('FirstName');
          expect(res.body.data).to.have.property('LastName');
          expect(res.body.data).to.have.property('Email');
          expect(res.body.data).to.have.property('token');
          authToken=res.body.data.token;
          done();
        });
    });

    it('should return an error for invalid login data', (done) => {
      const invalidLogin = {
        Email: 'test@gmail.com',
        Password: 'InvalidPassword'
      };
      request(app)
        .post('/api/users/login')
        .send(invalidLogin)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });

    it('should return an error for non-existing email', (done) => {
      const nonExistingEmail = {
        Email: 'nonexisting@example.com',
        Password: 'Test@1234'
      };
      request(app)
        .post('/api/users/login')
        .send(nonExistingEmail)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('POST /api/users/forgotPassword', () => {
    it('should send reset password link to user email', (done) => {
      const forgotPasswordRequest = {
        Email: 'test@gmail.com'
      };
      request(app)
        .post('/api/users/forgotPassword')
        .send(forgotPasswordRequest)
        .timeout(25000)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.equal(true);
          resetToken = res.body.data;
          done();
        });
    });

    it('should return an error for non-existing email', (done) => {
      const nonExistingEmail = {
        Email: 'nonexisting@example.com'
      };
      request(app)
        .post('/api/users/forgotPassword')
        .send(nonExistingEmail)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });


  describe('PUT /api/users/resetPassword', () => {
    it('should reset user password', (done) => {
      const resetPasswordRequest = {
        Password: 'User@1234'
      };  
      request(app)
        .put('/api/users/resetPassword')
        .set('Authorization', `Bearer ${resetToken}`) 
        .send(resetPasswordRequest)
        .timeout(25000)
        .end((err, res) => {
          if (err) console.error(err); 
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  

    it('should return an error for invalid token', (done) => {
      const invalidToken = 'invalidtoken';
      const resetPasswordRequest = {
        Password: 'New@Password'
      };
      request(app)
        .put('/api/users/resetPassword')
        .set('Authorization', `Bearer ${invalidToken}`) 
        .send(resetPasswordRequest)
        .timeout(25000)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });

    it('should return an error for invalid password', (done) => {
      const resetPasswordRequest = {
        Password: 'short'
      };
      request(app)
        .put('/api/users/resetPassword')
        .set('Authorization', `Bearer ${resetToken}`) 
        .send(resetPasswordRequest)
        .timeout(25000)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

});

describe('Note APIs Test', () => {

  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /api/notes', () => {
    it('should create a new note', (done) => {
      const newNote = {
        title: 'Test Note',
        description: 'This is a test note',
        createdBy: 'test@gmail.com'
      };
      request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newNote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data.title).to.equal(newNote.title);
          expect(res.body.data).to.have.property('description');
          expect(res.body.data.description).to.equal(newNote.description);
          expect(res.body.data).to.have.property('createdBy');
          expect(res.body.data.createdBy).to.equal(newNote.createdBy);
          noteId = res.body.data._id;
          done();
        });
    });

    it('should return an error for invalid note data', (done) => {
      const invalidNote = {
        title: 'T',
        description: 'This is a test note',
        createdBy: 'test@gmail.com'
      };
      request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidNote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });

  });

  describe('GET /api/notes', () => {
    it('should get all notes', (done) => {
      request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/notes/:_id', () => {
    it('should get a note by id', (done) => {
      request(app)
        .get(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data._id).to.equal(noteId);
          done();
        });
    });

    it('should return an error for non-existing note id', (done) => {
      const nonExistingNoteId = 'nonexistingnoteid';
      request(app)
        .get(`/api/notes/${nonExistingNoteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('PUT /api/notes/:_id', () => {
    it('should update a note', (done) => {
      const updatedNote = {
        title: 'Updated Test Note',
        description: 'This is an updated test note'
      };
      request(app)
        .put(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedNote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data.title).to.equal(updatedNote.title);
          expect(res.body.data).to.have.property('description');
          expect(res.body.data.description).to.equal(updatedNote.description);
          done();
        });
    });

    it('should return an error for non-existing note id during update', (done) => {
      const nonExistingNoteId = 'nonexistingnoteid';
      const updatedNote = {
        title: 'Updated Test Note',
        description: 'This is an updated test note'
      };
      request(app)
        .put(`/api/notes/${nonExistingNoteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedNote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

 

  describe('PUT /api/notes/:_id/isArchive', () => {
    it('should archive a note', (done) => {
      request(app)
        .put(`/api/notes/${noteId}/isArchive`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('isArchive');
          expect(res.body.data.isArchive).to.equal(true);
          done();
        });
    });

    it('should return an error for non-existing note id during archive', (done) => {
      const nonExistingNoteId = 'nonexistingnoteid';
      request(app)
        .put(`/api/notes/${nonExistingNoteId}/isArchive`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('PUT /api/notes/:_id/isTrash', () => {
    it('should move a note to trash', (done) => {
      request(app)
        .put(`/api/notes/${noteId}/isTrash`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('isTrash');
          expect(res.body.data.isTrash).to.equal(true);
          done();
        });
    });

    it('should return an error for non-existing note id during trash operation', (done) => {
      const nonExistingNoteId = 'nonexistingnoteid';
      request(app)
        .put(`/api/notes/${nonExistingNoteId}/isTrash`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });


  describe('DELETE /api/notes/:_id', () => {
    it('should delete a note', (done) => {
      request(app)
        .delete(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.equal(true);
          done();
        });
    });

    it('should return an error for non-existing note id during deletion', (done) => {
      const nonExistingNoteId = 'nonexistingnoteid';
      request(app)
        .delete(`/api/notes/${nonExistingNoteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });


});
